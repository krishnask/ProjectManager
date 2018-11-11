using System;
using ProjectManager.Persistence;
using System.Collections.Generic;

namespace ProjectManager.Business
{
    public class UserRepository
    {
        ProjectManagerContext _context = ProjectManagerContext.CreateContext();
        public UserRepository()
        {

        }
        bool AddUser(User user)
        {
            return false;
        }
        bool GetUser(int empId)
        {
            return false;
        }
        bool DeleteUser(int empId)
        {
            return false;
        }
        List<User> GetAllUsers()
        {
            return new List<User>();
        }
        bool UpdateUser(int empId, User user)
        {
            return false;
        }
    }
}
