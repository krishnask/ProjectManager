using System;
using ProjectManager.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity.Infrastructure;

namespace ProjectManager.Business
{
    public class UserRepository
    {
        ProjectManagerContext _context;
        public UserRepository()
        {
            _context = ProjectManagerContext.CreateContext();

        }
        public UserRepository(ProjectManagerContext context)
        {
            _context = context;
        }
        public bool AddUser(User user)
        {
            try
            {
                _context.users.Add(user);
                _context.SaveChanges();
                return true;
            }
            catch(DbUpdateException ex)
            // TODO - log the exception
            {
                throw new Exception(ex.Message);
            }
            
        }
        public User GetUser(int empId) // TODO - is this required?
        {
            var entity = _context.users.Find(empId);
            return entity;
        }
        public bool DeleteUser(int empId)
        {
            var entity = _context.users.Find(empId);
            if (entity == null)
            {
                return false;
            }
            _context.users.Remove(entity);
            _context.SaveChanges();

            return true;
        }
        public List<User> GetAllUsers()
        {
            var data = _context.users.ToList<User>();
            return data;
        }
        public bool UpdateUser(int empId, User user)
        {
            var entity = _context.users.Find(empId);
            if (entity == null)
            {
                return false;
            }
            //user.UserId = null;

            _context.Entry(entity).CurrentValues.SetValues(user);
            _context.SaveChanges();

            return true;
        }
    }
}
