using FeelYourOrgans.Contracts.Entities;
using Microsoft.EntityFrameworkCore;

namespace FeelYourOrgans.Middleware.Shared
{
    public class MicroserviceDbContext : DbContext 
    {
        private readonly string CONNECTION = "Server=health-control.cmhkqigvllj1.us-east-1.rds.amazonaws.com;Database=health_control;Uid=admin;Pwd=mTq5KM8MDFCi4ZJvhAgu;";

        public MicroserviceDbContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseMySql(CONNECTION);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
               .HasOne(s => s.Iot)
               .WithMany(ad => ad.Users)
               .HasForeignKey(ad => ad.IotId);

            modelBuilder.Entity<Iot>()
                .HasOne(s => s.Limb)
                .WithMany(ad => ad.Devices)
                .HasForeignKey(ad => ad.LimbId);

            modelBuilder.Entity<IotIndicator>()
                .HasAlternateKey(sc => new { sc.IndicatorId, sc.IotId });

            modelBuilder.Entity<IotRecord>()
                .HasOne(iv => iv.IotIndicator)
                .WithMany(i => i.Records)
                .HasForeignKey(ind => ind.IotIndicatorId);

        }
    }
}
