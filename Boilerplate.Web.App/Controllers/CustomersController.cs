﻿using System;
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
        public JsonResult CreateCustomer([FromBody]Customer customer)

        {
            if (ModelState.IsValid)
            {
                _context.Add(customer);
                _context.SaveChanges();
            }
            return Json(customer);
        }

        // GET: Customers/Edit/5
        public JsonResult CustgetEdit(int? id)
        {
            if (id == null)
            {
                return Json("NotFound");
            }

            var customer = _context.Customer.Find(id);
            if (customer == null)
            {
                return Json("NotFound");
            }
            return Json(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[ValidateAntiForgeryToken]
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
            }
            return Json(cust);
        }

        // GET: Customers/Delete/5
        public JsonResult GetDelete([FromBody]Customer del)
        {
            if (del == null)
            {
                return Json("ID not found");
            }

            var customer = _context.Customer
                .FirstOrDefault(m => m.Id ==del.Id);
            if (customer == null)
            {
                return Json("Details not found");
            }
            return Json(customer);
        }

        // POST: Customers/Delete/5
        //[HttpPost, ActionName("Delete")]
        [HttpDelete]
        //[ValidateAntiForgeryToken]
        public JsonResult DeleteCustomer([FromBody]Customer del)
        {
            var customer = _context.Customer.Find(del.Id);
            _context.Entry(customer).Collection(c => c.ProductSold).Load();
            if (customer.ProductSold.Count > 0)
            {
               foreach(var productSold in customer.ProductSold)
                {
                    _context.ProductSold.Remove(productSold);
                }            
            }
            _context.Customer.Remove(customer);
            _context.SaveChanges();

            return Json("Customer Removed Successfully");
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
