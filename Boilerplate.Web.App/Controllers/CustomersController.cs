using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Boilerplate.Web.App.Models;
using PagedList;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomersController : Controller
    {
        private readonly TALENTContext _context;

        public CustomersController(TALENTContext context)
        {
            _context = context;
        }

        // GET: Customers
        public async Task<IActionResult> Index()
        {
            return View(await _context.Customer.ToListAsync());
        }

        public JsonResult GetCustomerJson(int page, int size)
        {
          var paged = _context.Customer.ToList().ToPagedList(page,size);
          var pagedWithMetaData = new { items = paged, metaData = paged.GetMetaData() };
          return Json(pagedWithMetaData); 
        }

            // GET: Customers/Details/5
            public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customer = await _context.Customer
                .FirstOrDefaultAsync(m => m.Id == id);
            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        // GET: Customers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
       // [ValidateAntiForgeryToken]
       //public async Task<IActionResult> Create([Bind("Id,Name,Address")] Customer customer)
       public JsonResult CreateCustomer([FromBody]Customer customer)

        {
            if (ModelState.IsValid)
            {
                _context.Add(customer);
              // await _context.SaveChangesAsync();
                _context.SaveChanges();
                //return RedirectToAction(nameof(Index));
            }
            return Json(customer);
        }

        // GET: Customers/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        public JsonResult CustgetEdit(int? id)
        {
            if (id == null)
            {
                //return NotFound();
                return Json("NotFound");
            }

            //var customer = await _context.Customer.FindAsync(id);
            var customer = _context.Customer.Find(id);
            if (customer == null)
            {
                //return NotFound();
                return Json("NotFound");
            }
            //return View(customer);
            return Json(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        // public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Address")] Customer customer)
        //public JsonResult CustputEdit (int id, [FromBody] Customer cust)
        [HttpPut]   
        public JsonResult EditCustomer([FromBody] Customer cust)
        {
            if (!CustomerExists(cust.Id))
            {
                return Json("Customer Id Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cust);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustomerExists(cust.Id))
                    {
                        return Json("Customer Id not exist");
                    }
                    else
                    {
                        throw;
                    }
                }
               // return RedirectToAction(nameof(Index));
            }
            return Json(cust);
        }

        // GET: Customers/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        public JsonResult Delete(int? id)
        {
            if (id == null)
            {
                //return NotFound();
                return Json("ID not found");
            }

            //var customer = await _context.Customer
            var customer = _context.Customer
                .FirstOrDefault(m => m.Id == id);
            if (customer == null)
            {
                //return NotFound();
                return Json("Details not found");
            }

            return Json(customer);
        }

        // POST: Customers/Delete/5
        //[HttpPost, ActionName("Delete")]
        [HttpDelete]
        //[ValidateAntiForgeryToken]
       // public async Task<IActionResult> DeleteConfirmed(int id)
        public JsonResult DeleteCustomer([FromBody]Customer del)

        {
            //var customer = await _context.Customer.FindAsync(id);
            var customer = _context.Customer.Find(del.Id);
            _context.Customer.Remove(customer);
            _context.SaveChanges();
            // return RedirectToAction(nameof(Index));
            return Json(customer);
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
