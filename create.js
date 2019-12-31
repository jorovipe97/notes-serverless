import uuid from 'uuid';
import { success, failure } from './libs/response-lib';
import * as dynamoDbLib from './libs/dynamodb-lib';
// import AWS from 'aws-sdk';
// const dynamoDb = new AWS.DynamoDB.DocumentClient();


// test function locally
// serverless invoke local --function create --path mocks/create-event.json
// noteId: 9ad85210-2c08-11ea-bfd1-9df1ff492fed
export async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        // 'Item' contains the attributes of the item to be created
        // - 'userId': user identities are federated through the
        //             Cognito Identity Pool, we will use the identity id
        //             as the user id of the authenticated user
        // - 'noteId': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request body
        // - 'createdAt': current Unix timestamp
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call('put', params);
        // Return status code 200 and the newly created item
        return success(params.Item);
    } catch (e) {
        console.error(e);
        // Return status code 500 on error
        return failure({status: false});
    }
}