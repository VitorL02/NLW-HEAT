import {PrismaClient} from "@prisma/client";

//Somente com essas tres linhas a conexão e feita com o banco de dados
const prismaCLient = new PrismaClient();

export default prismaCLient;