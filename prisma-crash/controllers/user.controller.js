import prisma from "../DB/db.config.js";

const userCreate = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({ status: 400, message: "Email is already taken" });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 201,
    data: newUser,
    message: "User created succesfully",
  });
};

const userUpdate = async (req, res) => {
  const userId = req.params.id;

  const { name, email, password } = req.body;

  const newUser = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 201,
    data: newUser,
    message: "User updated succesfully",
  });
};



const usersFetch = async (req, res) => {
  

  
  const users = await prisma.user.findMany({})

  return res.json({
    status: 201,
    data: users,
    message: "Users fetched succesfully",
  });
};


const userFetchOne = async (req, res) => {

  const userId = req.params.id;



  const user = await prisma.user.findFirst({
    where:{
      id:Number(userId)
    }
  })

  return res.json({
    status: 201,
    data: user,
    message: "User fetched succesfully",
  });
};



export { userCreate,userUpdate,usersFetch,userFetchOne };
