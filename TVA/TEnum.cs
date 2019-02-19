#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 19/02/2019 08:32
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using System.ComponentModel;

namespace TVA
{
    /// <summary>
    /// Enumeration
    /// </summary>
    public class TEnum
    {
        /// <summary>
        /// Status
        /// </summary>
        public enum Status
        {
            /// <summary>
            /// Inactive, just created
            /// </summary>
            [Description("Inactive")]
            Inactive = 0,

            /// <summary>
            /// Normal
            /// </summary>
            [Description("Normal")]
            Normal = 1 << 0,

            /// <summary>
            /// Deleted
            /// </summary>
            [Description("Deleted")]
            Deleted = 1 << 1,

            /// <summary>
            /// Activated
            /// </summary>
            [Description("Activated")]
            Activated = 1 << 2,

            /// <summary>
            /// Notified
            /// </summary>
            [Description("Notified")]
            Notified = 1 << 3
        }

        /// <summary>
        /// Status of Holiday
        /// </summary>
        public enum HolidayStatus
        {
            /// <summary>
            /// Inactive, just created
            /// </summary>
            [Description("Inactive")]
            Inactive = 0,

            /// <summary>
            /// Normal, active without deactivation
            /// </summary>
            [Description("Active")]
            Active = 1,

            /// <summary>
            /// Deleted
            /// </summary>
            [Description("Deleted")]
            Deleted = 2
        }

        /// <summary>
        /// Status of LeaveApply
        /// </summary>
        public enum LeaveApplyStatus
        {
            /// <summary>
            /// Inactive, canceled
            /// </summary>
            [Description("Canceled")]
            Canceled = 0,

            /// <summary>
            /// Pending approval, just created
            /// </summary>
            [Description("Pending Approval")]
            PendingApproval = 1,

            /// <summary>
            /// Deleted
            /// </summary>
            [Description("Deleted")]
            Deleted = 2,

            /// <summary>
            /// Approved
            /// </summary>
            [Description("Approved")]
            Approved = 3,

            /// <summary>
            /// Rejected
            /// </summary>
            [Description("Rejected")]
            Rejected = 4
        }

        /// <summary>
        /// Status of LeaveApplyDeatail
        /// </summary>
        public enum LeaveApplyDetailStatus
        {
            /// <summary>
            /// Inactive, canceled
            /// </summary>
            [Description("Canceled")]
            Canceled = 0,

            /// <summary>
            /// Pending Approval, Pending Read
            /// </summary>
            [Description("Pending")]
            Pending = 1,

            /// <summary>
            /// Deleted
            /// </summary>
            [Description("Deleted")]
            Deleted = 2,

            /// <summary>
            /// Approved, Read
            /// </summary>
            [Description("Done")]
            Done = 3,

            /// <summary>
            /// Rejected
            /// </summary>
            [Description("Rejected")]
            Rejected = 4
        }

        /// <summary>
        /// Status of Notification
        /// </summary>
        public enum NotificationStatus
        {
            /// <summary>
            /// Inactive, canceled
            /// </summary>
            [Description("Canceled")]
            Canceled = 0,

            /// <summary>
            /// Active
            /// </summary>
            [Description("Active")]
            Active = 1,

            /// <summary>
            /// Deleted
            /// </summary>
            [Description("Deleted")]
            Deleted = 2,
        }

        /// <summary>
        /// Status of Notification
        /// </summary>
        public enum NotificationLogStatus
        {
            /// <summary>
            /// Inactive, canceled
            /// </summary>
            [Description("Canceled")]
            Canceled = 0,

            /// <summary>
            /// Active
            /// </summary>
            [Description("PendingSend")]
            PendingSend = 1,

            /// <summary>
            /// Deleted
            /// </summary>
            [Description("Deleted")]
            Deleted = 2,

            /// <summary>
            /// Sent, pending read
            /// </summary>
            [Description("Sent")]
            Sent = 4,

            /// <summary>
            /// Read
            /// </summary>
            [Description("Read")]
            Read = 8
        }
    }
}