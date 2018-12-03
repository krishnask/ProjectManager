using System;
using System.Collections.Generic;
using System.Linq;
using ProjectManager.Persistence;
using System.Data.Entity.Infrastructure;


namespace ProjectManager.Business
{
    public class TaskRepository
    {
        ProjectManagerContext _context;
        public TaskRepository()
        {
            _context = ProjectManagerContext.CreateContext();

        }
        public TaskRepository(ProjectManagerContext context)
        {
            _context = context;
        }
        public bool AddTask(Task task)
        {
            try
            {
                _context.tasks.Add(task);
                _context.SaveChanges();
                return true;
            }
            catch (DbUpdateException ex)
            // TODO - log the exception
            {
                throw new Exception("Task Already Exist.");
            }

        }
        public User GetTask(int taskId) // TODO - is this required?
        {
            var entity = _context.users.Find(taskId);
            return entity;
        }
        public bool DeleteTask(int taskId)
        {
            var entity = _context.tasks.Find(taskId);
            if (entity == null)
            {
                return false;
            }
            _context.tasks.Remove(entity);
            _context.SaveChanges();

            return true;
        }
        public List<Task> GetAllTasks()
        {
            var data = _context.tasks.ToList<Task>();
            return data;
        }
        public bool UpdateTask(int taskId, Task task)
        {
            var entity = _context.tasks.Find(taskId);
            if (entity == null)
            {
                return false;
            }

            _context.Entry(entity).CurrentValues.SetValues(task);
            _context.SaveChanges();

            return true;
        }
    }
}
