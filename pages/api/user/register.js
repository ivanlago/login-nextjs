import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, email, password } = req.body;
  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  res.json(result);
}
