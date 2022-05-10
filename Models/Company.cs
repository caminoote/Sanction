using System;
using System.Collections.Generic;

#nullable disable

namespace Comp
{
    public partial class Company
    {
        public int IdCompany { get; set; }
        public string NameCompany { get; set; }
        public string BusinessArea { get; set; }
        public byte[] Photo { get; set; }

        /// <summary>
        /// Индификатор санкции
        /// </summary>
        public int? IdSanction { get; set; }

        public virtual Sanction IdSanctionNavigation { get; set; }
    }
}
