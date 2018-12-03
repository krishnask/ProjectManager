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
    public class TasksController : ApiController
    {
        TaskRepository _repository;
        public TasksController()
        {
            _repository = new TaskRepository();
        }
        // GET api/values
        public IHttpActionResult Get()
        {
            List<Task> taskList = _repository.GetAllTasks();

            return Ok(taskList);
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post(Task task)
        {
            _repository.AddTask(task);
        }

        // PUT api/values/5
        public void Put(int id, Task task)
        {
            _repository.UpdateTask(id, task);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
           // _repository.SuspendTask(id);
        }
    }
}
