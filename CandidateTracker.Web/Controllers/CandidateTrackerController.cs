using CandidateTracker.Data;
using CandidateTracker.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateTrackerController : ControllerBase
    {
        private string _connectionString;

        public CandidateTrackerController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("addcandidate")]
        [HttpPost]
        public void AddCandidate(Candidate candidate)
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            repo.AddCandidate(candidate);
        }

        [HttpGet("getcandidates")]
        public List<Candidate> GetCandidates()
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            return repo.GetCandidates();
        }

        [HttpGet("getcandidate")]
        public Candidate GetCandidate(int id)
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            return repo.GetCandidate(id);
        }

        [Route("updatestatus")]
        [HttpPost]
        public void UpdateStatus(CandidateViewModel cvm)
        {
            var repo = new CandidateTrackerRepository(_connectionString);
            repo.UpdateStatus(cvm.CandidateId, cvm.Status);
        }
    }
}
