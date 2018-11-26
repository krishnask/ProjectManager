using System;
using ProjectManager.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Infrastructure;

namespace ProjectManager.Business
{
    public class ProjectRepository
    {
        ProjectManagerContext _context;
        public ProjectRepository()
        {
            _context = ProjectManagerContext.CreateContext();
        }
        public ProjectRepository(ProjectManagerContext context)
        {
            _context = context;
        }

        public bool AddProject( Project project)
        {
            try
            {
                _context.projects.Add(project);
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateException)
            // TODO - log the exception
            {
                throw new Exception("Project Already Exist.");
            }
        }
        public Project GetProject(int projectId) // TODO - is this required?
        {
            var entity = _context.projects.Find(projectId);
            return entity;
        }
        public bool SuspendProject(int projectId)
        {
            var entity = _context.projects.Find(projectId);
            if (entity == null)
            {
                return false;
            }
            _context.projects.Remove(entity); // TODO - suspend
            _context.SaveChanges();

            return true;
        }
        public List<Project> GetAllProjects()
        {
            var data = _context.projects.ToList<Project>();
            return data;
        }
        public bool UpdateProject(int projectId, Project project)
        {
            var entity = _context.projects.Find(projectId);
            if (entity == null)
            {
                return false;
            }

            _context.Entry(entity).CurrentValues.SetValues(project);
            _context.SaveChanges();

            return true;
        }
    }
}
