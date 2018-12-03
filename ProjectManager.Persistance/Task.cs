using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectManager.Persistence
{
    [Table("TaskDetails")]
    public class Task
    {
        [Key]
        public int TaskId { get; set; }

        public int ProjectId { get; set; }

        public string TaskName { get; set; }

        public bool IsParentTask { get; set; }

        public int Priority { get; set; }

        public int ParentTask { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int UserId { get; set; }
    }
}
