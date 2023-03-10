// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { Configuration, OpenAIApi } from 'openai'

// export const config ={
//   runtime: "edge"
// }

// type Data = {
//   sentence: any | undefined
// }

// const apiKey = process.env.API_KEY

// const configurastion = new Configuration({
//   apiKey
// })

// const openai = new OpenAIApi(configurastion)

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {

//   const {prompt} = req.body

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{role: "user", content: prompt}],
//     stream: true
//   })

//   const sentence = response.data
//   const stream = await OpenAIStream(response)

//   res.status(200).json({sentence})
// }

import { OpenAIStream, OpenAIStreamPayload } from "./server";

if (!process.env.API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;