using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// TODO - do not have employee id as the key
namespace ProjectManager.Persistence
{
    [Table("UserDetails")]
    public class User
    {
        [Key, Column(Order =1),]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int EmployeeId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        
    }
    
}
