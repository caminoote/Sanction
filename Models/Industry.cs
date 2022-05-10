using System;
using System.Collections.Generic;

#nullable disable

namespace Comp
{
    public partial class Industry
    {
        public Industry()
        {
            Sanctions = new HashSet<Sanction>();
        }

        public int IdIndustry { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Sanction> Sanctions { get; set; }
    }
}
