using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectManager.Business;
using ProjectManager.Persistence;

namespace ProjectManager.WebAPI.Controllers
{
    public class UsersController : ApiController
    {
        UserRepository _repository;
        public UsersController()
        {
            _repository = new UserRepository();
        }
        // GET api/values
        public IHttpActionResult Get()
        {
            List<User> userList = _repository.GetAllUsers();

            return Ok(userList);
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post(User user)
        {
            _repository.AddUser(user);
        }

        // PUT api/values/5
        public void Put(int id, User user)
        {
            _repository.UpdateUser(id, user);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            _repository.DeleteUser(id);
        }
    }
}
