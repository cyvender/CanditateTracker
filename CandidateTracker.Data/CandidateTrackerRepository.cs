using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CandidateTracker.Data
{
    public class CandidateTrackerRepository
    {
        private readonly string _connectionString;

        public CandidateTrackerRepository(string connectionString )
        {
            _connectionString = connectionString;
        }

        public void AddCandidate(Candidate candidate)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            context.Add(candidate);
            context.SaveChanges();
        }

        public List<Candidate> GetCandidates()
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.ToList();
        }

        public Candidate GetCandidate(int id)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            return context.Candidates.FirstOrDefault(c => c.Id == id);
        }

        public void UpdateStatus(int id, int status)
        {
            using var context = new CandidateTrackerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Candidates SET Status = {status} WHERE Id = {id}");
        }
    }
}
