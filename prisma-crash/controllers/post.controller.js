import prisma from "../DB/db.config.js";

const postCreate = async (req, res) => {
  const { user_id, title, desciption } = req.body;

  

  

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title: title,
      desciption: desciption,
    },
  });

  return res.json({
    status: 201,
    data: newPost,
    message: "Post created succesfully",
  });
};




const postsFetch = async (req, res) => {
  

  
  const posts = await prisma.post.findMany()

  return res.json({
    status: 201,
    data: posts,
    message: "posts fetched succesfully",
  });
};


const postsFetchByUser = async (req, res) => {
  
    const user_id = req.params.id

  
    const posts = await prisma.post.findMany({
        where:{
           user_id:Number(user_id) 
        }
    })
  
    return res.json({
      status: 201,
      data: posts,
      message: "posts fetched succesfully",
    });
  };
  
  



export {postCreate,postsFetch,postsFetchByUser};
