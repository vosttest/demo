using Microsoft.EntityFrameworkCore;
using SKG;

namespace TVA.DAL
{
    using Models;

    public partial class ZContext : DbContext
    {
        public ZContext() { }

        public ZContext(DbContextOptions<ZContext> options) : base(options) { }

        public virtual DbSet<Code> Code { get; set; }
        public virtual DbSet<CodeType> CodeType { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<Holiday> Holiday { get; set; }
        public virtual DbSet<LatencyNote> LatencyNote { get; set; }
        public virtual DbSet<Leave> Leave { get; set; }
        public virtual DbSet<LeaveApply> LeaveApply { get; set; }
        public virtual DbSet<LeaveApplyDetail> LeaveApplyDetail { get; set; }
        public virtual DbSet<LeaveDetail> LeaveDetail { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<NotificationInfo> NotificationInfo { get; set; }
        public virtual DbSet<NotificationLog> NotificationLog { get; set; }
        public virtual DbSet<OfficialStatement> OfficialStatement { get; set; }
        public virtual DbSet<Personnel> Personnel { get; set; }
        public virtual DbSet<PersonnelLog> PersonnelLog { get; set; }
        public virtual DbSet<Position> Position { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Setting> Setting { get; set; }
        public virtual DbSet<TimeKeeping> TimeKeeping { get; set; }
        public virtual DbSet<TimeKeepingDetail> TimeKeepingDetail { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserInfo> UserInfo { get; set; }
        public virtual DbSet<UserLog> UserLog { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var user = ZRsa.Decrypt(AppSetting.S.DbUser);
                var password = ZRsa.Decrypt(AppSetting.S.DbPassword);
                var t = string.Format(AppSetting.S.DbConnection, user, password);
                optionsBuilder.UseSqlServer(t);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.1-servicing-10028");

            modelBuilder.Entity<Code>(entity =>
            {
                entity.ToTable("Code", "System");

                entity.Property(e => e.CodeType)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DisplayAs).HasColumnType("ntext");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.CodeTypeNavigation)
                    .WithMany(p => p.CodeNavigation)
                    .HasForeignKey(d => d.CodeType)
                    .HasConstraintName("FkCodeType");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FkCodeParent");
            });

            modelBuilder.Entity<CodeType>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PK__CodeType__A25C5AA6C047FCB7");

                entity.ToTable("CodeType", "System");

                entity.Property(e => e.Code)
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DisplayAs).HasColumnType("ntext");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("Group", "System");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(512);

                entity.Property(e => e.InitialChar).HasMaxLength(32);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Holiday>(entity =>
            {
                entity.ToTable("Holiday", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Day)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Month)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Note).HasMaxLength(512);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.TypeOfDay)
                    .HasMaxLength(16)
                    .IsUnicode(false);

                entity.Property(e => e.Year)
                    .HasMaxLength(4)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LatencyNote>(entity =>
            {
                entity.ToTable("LatencyNote", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.LateTimeTo).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Note).HasMaxLength(512);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Leave>(entity =>
            {
                entity.ToTable("Leave", "Business");

                entity.Property(e => e.Balance).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ExpiredDate).HasColumnType("date");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<LeaveApply>(entity =>
            {
                entity.ToTable("LeaveApply", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FromTime).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Note).HasMaxLength(512);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.ToTime).HasColumnType("datetime");

                entity.Property(e => e.TotalWorkingHour).HasColumnType("decimal(5, 2)");
            });

            modelBuilder.Entity<LeaveApplyDetail>(entity =>
            {
                entity.ToTable("LeaveApplyDetail", "Business");

                entity.Property(e => e.ApplyDetailType)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<LeaveDetail>(entity =>
            {
                entity.ToTable("LeaveDetail", "Business");

                entity.Property(e => e.Amount).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FromTime).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.ToTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.ToTable("News", "Business");

                entity.Property(e => e.Brief).HasMaxLength(512);

                entity.Property(e => e.Category)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Content).HasColumnType("ntext");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ImgUrl).IsUnicode(false);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.NewsType)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.Subject).HasMaxLength(512);

                entity.Property(e => e.Thumbnail).IsUnicode(false);
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.ToTable("Notification", "Business");

                entity.Property(e => e.ContentHtml).HasColumnType("ntext");

                entity.Property(e => e.ContentType)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.NotiType)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.RefType).HasMaxLength(20);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<NotificationInfo>(entity =>
            {
                entity.ToTable("NotificationInfo", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Recivers).HasMaxLength(512);

                entity.Property(e => e.SentType).HasMaxLength(32);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<NotificationLog>(entity =>
            {
                entity.ToTable("NotificationLog", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.SentType).HasMaxLength(32);
            });

            modelBuilder.Entity<OfficialStatement>(entity =>
            {
                entity.ToTable("OfficialStatement", "Business");

                entity.Property(e => e.ApprovedOn).HasColumnType("datetime");

                entity.Property(e => e.Content).HasColumnType("ntext");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.StatementId)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.StatementType)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Personnel>(entity =>
            {
                entity.ToTable("Personnel", "Business");

                entity.Property(e => e.CardNumber)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Pin)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<PersonnelLog>(entity =>
            {
                entity.ToTable("PersonnelLog", "Business");

                entity.Property(e => e.Altitude)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.DeviceId)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Latitude)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Longtitude)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Pin)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.ToTable("Position", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DepartmentId).HasMaxLength(32);

                entity.Property(e => e.JobCategory).HasMaxLength(32);

                entity.Property(e => e.JobLevel).HasMaxLength(32);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.PositionType).HasMaxLength(32);

                entity.Property(e => e.PreferLang).HasMaxLength(32);

                entity.Property(e => e.SalaryType).HasMaxLength(64);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role", "System");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(512);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Setting>(entity =>
            {
                entity.HasKey(e => e.Key)
                    .HasName("PK__Setting__C41E0288159FB5F4");

                entity.ToTable("Setting", "System");

                entity.Property(e => e.Key)
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DataType)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Module)
                    .HasMaxLength(16)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.Value).HasColumnType("ntext");
            });

            modelBuilder.Entity<TimeKeeping>(entity =>
            {
                entity.ToTable("TimeKeeping", "Business");

                entity.Property(e => e.ApprovedOn).HasColumnType("datetime");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FromTime).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.ToTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<TimeKeepingDetail>(entity =>
            {
                entity.ToTable("TimeKeepingDetail", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Note).HasMaxLength(512);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.TotalHour).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.TypeOfDay)
                    .HasMaxLength(32)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "System");

                entity.Property(e => e.Birthday).HasColumnType("smalldatetime");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName).HasMaxLength(32);

                entity.Property(e => e.Joined).HasColumnType("smalldatetime");

                entity.Property(e => e.LastName).HasMaxLength(32);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Pin)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.ReminderExpire).HasColumnType("datetime");

                entity.Property(e => e.ReminderToken)
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.Property(e => e.Salt)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.Property(e => e.UserName)
                    .HasMaxLength(64)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.ToTable("UserInfo", "Business");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.EndedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.StartedOn).HasColumnType("datetime");

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<UserLog>(entity =>
            {
                entity.ToTable("UserLog", "System");

                entity.Property(e => e.Action).IsUnicode(false);

                entity.Property(e => e.ContentAfter).HasColumnType("ntext");

                entity.Property(e => e.ContentBefore).HasColumnType("ntext");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Objects).IsUnicode(false);

                entity.Property(e => e.Status).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLog)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FkLogUser");
            });
        }
    }
}