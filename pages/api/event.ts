import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import type { ApiFuncs, ApiResponseData } from "util/functions";
import {
  event,
  fetchEvents,
  updateEventAttendance,
} from "util/db/event";
import { profile, profile_update_schema, fetchProfile, updateProfileSet } from "util/db/profile";

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
    /**
     * Fetch list of all events during a given month & full attendee profile
     * @param req NextApiRequest
     * @param res NextApiResponse
     * @returns event[]
     */
    GET: async (req: NextApiRequest, res: NextApiResponse<DataGET>) => {
      try {

        const currentDate = new Date();
        const adjustedYm = new Date(currentDate.getTime() - 60000 * currentDate.getTimezoneOffset());
        // fetch all events that are happening in the current month
        const events = await fetchEvents(adjustedYm, true);
        const eventsWithAttendees: event[] = [];

        for (const oneEvent of events) {
          const attendees: profile[] = [];

          // replace attendee id with full profile
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
    /**
     * Called to update the attendance information for an event when a user checks in
     * @param req NextApiRequest
     * @param res NextApiResponse
     * @returns updated event document
     */
    PUT: async (req: NextApiRequest, res: NextApiResponse<DataPUT>) => {
      try {

        const currentDate = new Date();
        const adjustedYm = new Date(currentDate.getTime() - 60000 * currentDate.getTimezoneOffset());
        // fetch all events that are happening in the current month
        const events = await fetchEvents(adjustedYm);

        for (const oneEvent of events) {
          // if the date for an event matches the current date & the check in code is correct
          if (
            oneEvent.url === req.body.code &&
            new Date(oneEvent.date).toDateString() === adjustedYm.toDateString()
          ) {

            console.log(req.body);
            // update the attendance information for the event
            const updatedEvent = await updateEventAttendance({
              cognito_id: req.body.cognito_id,
              eventDate: oneEvent.date,
            });

            // update the profile information for the user
            const updatedProfile = await updateProfileSet(req.body.cognito_id, {
              field: "Attendance",
              value: oneEvent.Name,
            })


            // return the updated document
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
        }
        res.json({
          status: false,
          message: "no matching event found",
        });
        return;
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
