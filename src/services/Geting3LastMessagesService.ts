import prismaClient from "../prisma";


class Geting3LastMessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
        //Faz um orderby no banco para adquirir somente as 3 ultimas mensagens da mais nova para mais "velha"
        take : 3,
        orderBy: {
            created_at: "desc"
        },
        include : { 
            user: true
        }
    });

    // Select * FROM MESSAGES LIMIT 3 ORDER BY CREATED AT DESC = E isso que esse service faz

    return messages;
  }
}

export { Geting3LastMessagesService };