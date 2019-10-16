require('dotenv').config();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AgentService from '../services/AgentService';
import Util from '../utils/Utils';

const util = new Util();

class AgentController {
//   static async getAllAgents(req, res) {
//     try {
//       const allBooks = await AgentService.getAllBooks();
//       if (allBooks.length > 0) {
//         util.setSuccess(200, 'Agents retrieved', allBooks);
//       } else {
//         util.setSuccess(200, 'No book found');
//       }
//       return util.send(res);
//     } catch (error) {
//       util.setError(400, error);
//       return util.send(res);
//     }
//   }

  static async register(req, res) {
    if (!req.body.phone || !req.body.address || !req.body.lcda || !req.body.name || !req.body.password) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newAgent = req.body;
    const theAgent = await AgentService.getSingleAgent(newAgent.phone);
    if(theAgent){
        util.setError(400, 'Phone number already exist!');
    }
    try {
      const createdAgent = await AgentService.addAgent(newAgent);
      util.setSuccess(201, 'Agent Registered!', createdAgent);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async login(req, res) {
    if (!req.body.phone || !req.body.password) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    if (req.body.password.length <= 6) {
      util.setError(400, 'Password is invalid');
      return util.send(res);
    }
    // res.send(validPass);
    try {
        const agent = req.body;
        const theAgent = await AgentService.getSingleAgent(agent.phone);
        if(!theAgent){
            util.setError(400, 'Phone number is not valid!');
        }
        const validPass = bcrypt.compareSync(req.body.password, theAgent.password);
        if(!validPass){
            util.setError(400, 'Password is wrong!');
        }else{
          let token = jwt.sign({theAgent},
          process.env.SECRET_KEY
        );
            res.header('auth-token', token)
            util.setSuccess(200, 'Agent Logged in successfully!', token);
        }
      return util.send(res);
    } catch (error) {
      util.setError(400, 'Phone number is wrong');
      return util.send(res);
    }
  }

//   static async updatedBook(req, res) {
//     const alteredBook = req.body;
//     const { id } = req.params;
//     if (!Number(id)) {
//       util.setError(400, 'Please input a valid numeric value');
//       return util.send(res);
//     }
//     try {
//       const updateBook = await AgentService.updateBook(id, alteredBook);
//       if (!updateBook) {
//         util.setError(404, `Cannot find book with the id: ${id}`);
//       } else {
//         util.setSuccess(200, 'Book updated', updateBook);
//       }
//       return util.send(res);
//     } catch (error) {
//       util.setError(404, error);
//       return util.send(res);
//     }
//   }

//   static async getABook(req, res) {
//     const { id } = req.params;

//     if (!Number(id)) {
//       util.setError(400, 'Please input a valid numeric value');
//       return util.send(res);
//     }

//     try {
//       const theBook = await AgentService.getABook(id);

//       if (!theBook) {
//         util.setError(404, `Cannot find book with the id ${id}`);
//       } else {
//         util.setSuccess(200, 'Found Book', theBook);
//       }
//       return util.send(res);
//     } catch (error) {
//       util.setError(404, error);
//       return util.send(res);
//     }
//   }

//   static async deleteBook(req, res) {
//     const { id } = req.params;

//     if (!Number(id)) {
//       util.setError(400, 'Please provide a numeric value');
//       return util.send(res);
//     }

//     try {
//       const bookToDelete = await AgentService.deleteBook(id);

//       if (bookToDelete) {
//         util.setSuccess(200, 'Book deleted');
//       } else {
//         util.setError(404, `Book with the id ${id} cannot be found`);
//       }
//       return util.send(res);
//     } catch (error) {
//       util.setError(400, error);
//       return util.send(res);
//     }
//   }
}

export default AgentController;