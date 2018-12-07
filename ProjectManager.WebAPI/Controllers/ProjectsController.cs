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
    public class ProjectsController : ApiController
    {
        ProjectRepository _repository;
        public ProjectsController()
        {
            _repository = new ProjectRepository();
        }
        // GET api/values
        public IHttpActionResult Get()
        {
            List<Project> projectList = _repository.GetAllProjects();

            return Ok(projectList);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            int numTasks = _repository.GetNumTasks(id);
            return Ok(numTasks);
        }

        // POST api/values
        public void Post(Project project)
        {
            _repository.AddProject(project);
        }

        // PUT api/values/5
        public void Put(int id, Project project)
        {
            _repository.UpdateProject(id, project);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            _repository.SuspendProject(id);
        }
    }
}
