﻿namespace Domain
{
    public class Activity //Models the data that we want to store in our database
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date  { get; set; }
        public string Description { get; set; } 
        public string Category { get; set; }    
        public string City { get; set; }
        public string Venue { get; set; }
    }
}
