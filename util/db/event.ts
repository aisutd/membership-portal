import AWS from "util/aws";
import { profile } from "util/db/profile";

export interface event {
  date: Date;
  Name: string;
  url: string;
  Attendees?: string[] | profile[];
}

export interface event_update_schema {
  eventDate: Date;
  cognito_id: string;
}

const fetchEvents = async (
  ym: Date,
  getAttendees: boolean = false
): Promise<event[]> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Events";
  const pk = ym.toISOString().substring(0, 7); // YYYY-MM

  const params = {
    TableName: table,
    KeyConditionExpression: "#pk = :partitionkey",
    ExpressionAttributeNames: {
      "#pk": "YearMonth",
    },
    ExpressionAttributeValues: {
      ":partitionkey": pk,
    },
  };
  const events: event[] = [];

  try {
    const result = await docClient.query(params).promise();
    
    result.Items?.forEach((item) => {
      events.push({
        date: new Date(item.YearMonth + "-" + item.DayTime + " CST"),
        Name: item.EventName,
        url: item.url,
        Attendees: getAttendees ? item.Attendees.values : [],
      });
    });
  } catch (err) {
    console.log(err);
  }

  return events;
};

const updateEventAttendance = async (
  update: event_update_schema
): Promise<event | null> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Events";

  const params = {
    TableName: table,
    Key: {
      YearMonth: update.eventDate.toISOString().substring(0, 7), // partition key
      DayTime: update.eventDate.toISOString().substring(8, 10), // sort key
    },
    UpdateExpression: "ADD #key :value",
    ExpressionAttributeNames: {
      "#key": "Attendees",
    },
    ExpressionAttributeValues: {
      ":value": docClient.createSet([update.cognito_id]),
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await docClient.update(params).promise();

    if (result.Attributes) {
      return {
        ...(result.Attributes as event),
        date: new Date(
          result.Attributes.YearMonth + "-" + result.Attributes.DayTime + " CST"
        ),
        Name: result.Attributes.EventName,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export { fetchEvents, updateEventAttendance };
