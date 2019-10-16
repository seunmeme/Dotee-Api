import database from '../src/models';

class AgentService {
  static async getAllAgents() {
    try {
      return await database.Agent.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addAgent(newAgent) {
    try {
      return await database.Agent.create(newAgent);
    } catch (error) {
      throw error;
    }
  }

  static async updateAgent(id, updateAgent) {
    try {
      const AgentToUpdate = await database.Agent.findOne({
        where: { id: Number(id) }
      });

      if (AgentToUpdate) {
        await database.Agent.update(updateAgent, { where: { id: Number(id) } });

        return updateAgent;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSingleAgent(phone) {
    try {
      const theAgent = await database.Agent.findOne({
        where: { phone: Number(phone) }
      });

      return theAgent;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAgent(id) {
    try {
      const AgentToDelete = await database.Agent.findOne({ where: { id: Number(id) } });

      if (AgentToDelete) {
        const deletedAgent = await database.Agent.destroy({
          where: { id: Number(id) }
        });
        return deletedAgent;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default AgentService;
