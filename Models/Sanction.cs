using System;
using System.Collections.Generic;

#nullable disable

namespace Comp
{
    public partial class Sanction
    {
        public Sanction()
        {
            Companies = new HashSet<Company>();
        }

        public int IdSanction { get; set; }
        public string SanctionText { get; set; }
        public DateTime DateSanction { get; set; }
        public int IdIndustry { get; set; }

        public virtual Industry IdIndustryNavigation { get; set; }
        public virtual ICollection<Company> Companies { get; set; }
    }
}
