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
    public class StoresController : Controller
    {
        private readonly TALENTContext _context;

        public StoresController(TALENTContext context)
        {
            _context = context;
        }

        // GET: Stores
        public async Task<IActionResult> Index()
        {
            return View(await _context.Store.ToListAsync());
        }

        public JsonResult GetStoreJson(int page, int size)
        {
            var paged = _context.Store.ToList().ToPagedList(page, size);
            var pagedWithMetaData = new { items = paged, metaData = paged.GetMetaData() };
            return Json(pagedWithMetaData);
        }

        // GET: Stores/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var store = await _context.Store
                .FirstOrDefaultAsync(m => m.Sid == id);
            if (store == null)
            {
                return NotFound();
            }

            return View(store);
        }

        // GET: Stores/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Stores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CreateStore([FromBody]Store store)

        {
            if (ModelState.IsValid)
            {
                _context.Add(store);
                // await _context.SaveChangesAsync();
                _context.SaveChanges();
                //return RedirectToAction(nameof(Index));
            }
            return Json(store);
        }

        // GET: Stores/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var store = await _context.Store.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }
            return View(store);
        }

        // POST: Stores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]
        //[ValidateAntiForgeryToken]
        public JsonResult EditStore([FromBody] Store store)
        {
            if (!StoreExists(store.Sid))
            {
                return Json("Store Id Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(store);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StoreExists(store.Sid))
                    {
                        return Json("Store Id not exist");
                    }
                    else
                    {
                        throw;
                    }
                }
                // return RedirectToAction(nameof(Index));
            }
            return Json(store);
        }

        // GET: Stores/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var store = await _context.Store
                .FirstOrDefaultAsync(m => m.Sid == id);
            if (store == null)
            {
                return NotFound();
            }

            return View(store);
        }

        // POST: Stores/Delete/5
        [HttpDelete]
        //[ValidateAntiForgeryToken]
        public JsonResult DeleteStore([FromBody]Store del)

        {
            var store = _context.Store.Find(del.Sid);
            _context.Store.Remove(store);
            _context.SaveChanges();
            // return RedirectToAction(nameof(Index));
            return Json(store);
        }

        private bool StoreExists(int id)
        {
            return _context.Store.Any(e => e.Sid == id);
        }
    }
}
