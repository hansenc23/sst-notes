import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@sst-notes/core/handler";
import dynamoDb from "@sst-notes/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    content: "",
    attachment: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid

      createdAt: Date.now(), // Current Unix timestamp
      ...data,
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});
