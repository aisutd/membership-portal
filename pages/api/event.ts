import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import type { ApiFuncs, ApiResponseData } from "util/functions";
import {
  event,
  fetchEvents,
  updateEventAttendance,
} from "util/db/event";
import { profile, fetchProfile } from "util/db/profile";

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
        const events = await fetchEvents(new Date(), true);
        const eventsWithAttendees: event[] = [];

        for (const oneEvent of events) {
          const attendees: profile[] = [];

          for (const member of (oneEvent.Attendees as string[])) {
            const attendee = await fetchProfile(member);
            
            if (attendee.exists) {
              attendees.push(attendee);
            }
          }
          oneEvent.Attendees = attendees;
          eventsWithAttendees.push(oneEvent);
        }

        res.json({
          status: true,
          message: "success",
          events: eventsWithAttendees,
        });
        return;
      } catch (err) {
        console.log(err);
        res.json({
          status: false,
          message: "failed to fetch events",
          events: [],
        });
      }
    },
    // Response for PUT requests
    PUT: async (req: NextApiRequest, res: NextApiResponse<DataPUT>) => {
      try {
        const events = await fetchEvents(new Date());

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
          return;
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
