import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import type { ApiFuncs, ApiResponseData } from "util/functions";
import {
  event,
  event_update_schema,
  fetchEvents,
  updateEventAttendance,
} from "util/db/event";

interface DataGET extends ApiResponseData {
  events: event[];
}

interface DataPUT extends ApiResponseData {
  event?: event;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({
      status: false,
      message: "invalid session",
    });
    return;
  }

  const method = req.method as keyof ApiFuncs;

  const handleCase: ApiFuncs = {
    // Response for GET requests
    GET: async (req: NextApiRequest, res: NextApiResponse<DataGET>) => {
      try {
        const events = await fetchEvents();

        res.json({
          status: true,
          message: "success",
          events: events,
        });
      } catch (err) {
        console.log(err);
        res.json({
          status: false,
          message: "failed to fetch access token",
          events: [],
        });
      }
    },
    // Response for PUT requests
    PUT: async (req: NextApiRequest, res: NextApiResponse<DataPUT>) => {
      try {
        const events = await fetchEvents();

        for (const oneEvent of events) {
          if (
            oneEvent.url === req.body.code &&
            new Date(oneEvent.date).toDateString() === new Date().toDateString()
          ) {
            const updatedEvent = await updateEventAttendance({
              cognito_id: req.body.cognito_id,
              eventDate: oneEvent.date,
            });
            if (updatedEvent) {
              res.json({
                status: true,
                message: "success",
                event: {
                    ...updatedEvent,
                    Attendees: [], // no need to send huge response data
                },
              });
              return;
            }
          }

          res.json({
            status: false,
            message: "no matching event found",
          });
        }
      } catch (err) {
        console.log(err);
        res.json({
          status: false,
          message: "failed to update event attendance",
        });
      }
    },
  };

  const response = handleCase[method];

  if (response) {
    response(req, res);
  } else {
    res.status(405).json({
      status: false,
      message: "invalid method",
    });
  }
}
