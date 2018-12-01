using System;
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
            //            _context.Database.Delete(); - uncomment to clean database
            //_context.Database.Create(); - uncomment to clean
            
            return _context;
        }
        public ProjectManagerContext()
            :base("name=PMContext")
        { }
        public virtual DbSet<User> users { get; set; }
        public virtual DbSet<Project> projects { get; set; }
        public virtual DbSet<Task> tasks { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<ProjectManagerContext>(null);

            base.OnModelCreating(modelBuilder);
        }
    }
}
