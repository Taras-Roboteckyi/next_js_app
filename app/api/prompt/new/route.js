import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    //Підключаємось до бази даних
    await connectToDB();
  } catch (error) {}
};
