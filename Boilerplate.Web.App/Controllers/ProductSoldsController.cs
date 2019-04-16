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
    public class ProductSoldsController : Controller
    {
        private readonly TALENTContext _context;

        public ProductSoldsController(TALENTContext context)
        {
            _context = context;
        }

        // GET: ProductSolds
        public async Task<IActionResult> Index()
        {
            var tALENTContext = _context.ProductSold.Include(p => p.Customer).Include(p => p.Product).Include(p => p.Store);
            return View(await tALENTContext.ToListAsync());
        }

        public JsonResult GetSalesJson(int page, int size)
        {
            //2019-04-12
            var salesContext = _context.ProductSold.Select(p => new SalesData{Id = p.Id, CustomerId= p.Customer.Id,
                CustomerName = p.Customer.Name,
                ProductId = p.Product.Pid,
                ProductName= p.Product.Pname,
                StoreId = p.Store.Sid,
                StoreName = p.Store.Sname,
                DateSold = p.DateSold.ToString("yyyy-MM-dd") });
            var paged = salesContext.ToList().ToPagedList(page, size);
            var pagedWithMetaData = new { items = paged, metaData = paged.GetMetaData() };
            return Json(pagedWithMetaData);
        }

        public JsonResult GetDropdownJson()
        {
            var customer = _context.Customer.Select(c => new Dropdown{ Value= c.Id, Text= c.Name }).ToList();
            var product = _context.Product.Select(p => new Dropdown { Value = p.Pid, Text = p.Pname }).ToList();
            var store = _context.Store.Select(p => new Dropdown { Value = p.Sid, Text = p.Sname }).ToList();
            return Json(new { customer, product, store});
        }


        // GET: ProductSolds/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var productSold = await _context.ProductSold
                .Include(p => p.Customer)
                .Include(p => p.Product)
                .Include(p => p.Store)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (productSold == null)
            {
                return NotFound();
            }

            return View(productSold);
        }

        // GET: ProductSolds/Create
        public IActionResult Create()
        {
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Id");
            ViewData["ProductId"] = new SelectList(_context.Product, "Pid", "Pid");
            ViewData["StoreId"] = new SelectList(_context.Store, "Sid", "Sid");
            return View();
        }

        // POST: ProductSolds/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CreateSale([FromBody] ProductSold productSold)
        {
            if (ModelState.IsValid)
            {
                _context.Add(productSold);
              _context.SaveChanges();               
            }
            return Json(productSold);
        }

        // GET: ProductSolds/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var productSold = await _context.ProductSold.FindAsync(id);
            if (productSold == null)
            {
                return NotFound();
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Id", productSold.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "Pid", "Pid", productSold.ProductId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Sid", "Sid", productSold.StoreId);
            return View(productSold);
        }

        // POST: ProductSolds/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]
        //[ValidateAntiForgeryToken]
        public JsonResult EditSale([FromBody] ProductSold productSold)
        {
            if (!ProductSoldExists(productSold.Id))
            {
                return Json("Product ID Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(productSold);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductSoldExists(productSold.Id))
                    {
                        return Json("Product id NotFound");
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Json(productSold);
        }

        // GET: ProductSolds/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var productSold = await _context.ProductSold
                .Include(p => p.Customer)
                .Include(p => p.Product)
                .Include(p => p.Store)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (productSold == null)
            {
                return NotFound();
            }

            return View(productSold);
        }

        // POST: ProductSolds/Delete/5
        [HttpDelete]
       // [ValidateAntiForgeryToken]
        public JsonResult DeleteSale([FromBody] ProductSold productSold)
        {
            var sale = _context.ProductSold.Find(productSold.Id);
            _context.ProductSold.Remove(sale);
            _context.SaveChanges();
            return Json(sale);
        }

        private bool ProductSoldExists(int id)
        {
            return _context.ProductSold.Any(e => e.Id == id);
        }
    }
}
