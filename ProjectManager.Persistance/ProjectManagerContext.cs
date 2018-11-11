﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
namespace ProjectManager.Persistence
{
    public class ProjectManagerContext : DbContext
    {
        private static ProjectManagerContext _context;
        public static ProjectManagerContext CreateContext()
        {
            if (_context == null)
                _context = new ProjectManagerContext();
            return _context;
        }
        public ProjectManagerContext()
            :base("name=ProjectManagerContext")
        { }
        public virtual DbSet<User> users { get; set; }
    }
}
