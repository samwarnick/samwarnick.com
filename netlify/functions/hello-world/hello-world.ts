import { Handler } from "@netlify/functions";
const { EMAIL_TOKEN } = process.env;

export const handler: Handler = async (event, context) => {
  console.log(EMAIL_TOKEN)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  if (!event.headers.authorization?.includes(EMAIL_TOKEN)) {
    return { statusCode: 401, body: "Unauthorized" };
  }
  const body = paramsToObject(new URLSearchParams(event.body).entries());
  console.log(event);
  console.log(context);
  console.log(body);
  return {
    statusCode: 200,
    body: JSON.stringify({ event, context, body }, undefined, 2),
  };
};

function paramsToObject(entries) {
  const result = {};
  for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}