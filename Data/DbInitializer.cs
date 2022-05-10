using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(CompContext context)
        {
            context.Database.EnsureCreated();

            if (context.Companies.Any() && context.Industries.Any() && context.Sanctions.Any())
            {
                return;
            }

            var sanction = new Sanction[]
            {
                new Sanction { SanctionText = "Топовые санкциии прям тоооооооооп", DateSanction = new DateTime(2022, 02, 13), IdIndustry = 1},
                new Sanction { SanctionText = "Не такие хорошие, как те но тоже классные", DateSanction = new DateTime(2022, 04, 21),  IdIndustry = 1}

            };
            foreach (Sanction e in sanction)
            {
                context.Sanctions.Add(e);
            }
            context.SaveChanges();


            var industry = new Industry[]
            {
                new Industry { Type = "Поставка товаров" },
                new Industry { Type = "Инвестиции в производство страны" }
        };
            foreach (Industry a in industry)
            {
                context.Industries.Add(a);
            }
            context.SaveChanges();

            var company = new Company[]
           {
                new Company { NameCompany = "No Name One",
                    BusinessArea = "Электроника",
                    IdSanction = 1 },
                new Company { NameCompany = "No Name Two",
                    BusinessArea = "Продукты питания",
                    IdSanction = 2 }
            };
            foreach (Company o in company)
            {
                context.Companies.Add(o);
            }
            context.SaveChanges();

        }
    }
}

