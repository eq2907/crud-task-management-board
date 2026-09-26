import { useState } from 'react';
import { LockKeyhole, ChevronDown, UserRoundPlus, Funnel, RefreshCcwDot, Search, Menu, X } from 'lucide-react';
import { AvaStacked } from './AvaStacked';
import { FilterPanel } from './FilterPanel';
import { useBoardStore } from '../store/useBoardStore';

function Nav() {
  const { filters, setFilter, isFilterPanelOpen, toggleFilterPanel, resetFilters } = useBoardStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hasActiveFilters =
    filters.search ||
    filters.assigneeIds.length > 0 ||
    filters.labels.length > 0 ||
    filters.dueDateStatus;

  return (
    <header className="nav-header container mx-auto">
      <nav>
        {/* ── Left ────────────────────────────────── */}
        <div className="nav__left">
          <button className="btn-project-list" type="button" aria-label="Project menu">
            <LockKeyhole size={18} />
            <span className="text-project">Adhivasindo</span>
            <ChevronDown size={18} />
          </button>
          <div className="nav__left-extras">
            <AvaStacked />
            <button className="btn btn--gray btn--gray__btn-group" type="button">
              <UserRoundPlus size={18} />
              <span className="nav-btn-label">Invite</span>
            </button>
          </div>
        </div>

        {/* ── Right (desktop) ─────────────────────── */}
        <div className="nav__right self-center">
          {/* Filter button */}
          <div className="filter-btn-wrapper" style={{ position: 'relative' }}>
            <button
              className={`btn-transparent btn-transparent__btn-group${isFilterPanelOpen || hasActiveFilters ? ' filter-active' : ''}`}
              type="button"
              id="filter-toggle-btn"
              onClick={toggleFilterPanel}
              aria-expanded={isFilterPanelOpen}
              aria-label="Toggle filter panel"
            >
              <Funnel size={18} />
              <span className="nav-btn-label">Filter</span>
              {hasActiveFilters && <span className="filter-badge" />}
            </button>
            <FilterPanel />
          </div>

          {/* Reset filters shortcut */}
          {hasActiveFilters && (
            <button
              className="btn-transparent btn-transparent__btn-group filter-clear-btn"
              type="button"
              onClick={resetFilters}
              title="Clear all filters"
            >
              <span>Clear filters</span>
            </button>
          )}

          <button
            className="btn-transparent bg-transparent--export-import btn-transparent__btn-group nav-export-btn"
            type="button"
          >
            <RefreshCcwDot size={18} />
            <span className="nav-btn-label">Export / Import</span>
          </button>

          {/* Search */}
          <div className="input-group nav-search">
            <button type="button" aria-label="Search">
              <Search size={18} />
            </button>
            <input
              className="input w-full"
              type="text"
              placeholder="Search Tasks"
              value={filters.search}
              onChange={(e) => setFilter({ search: e.target.value })}
              aria-label="Search tasks"
            />
            {filters.search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setFilter({ search: '' })}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* ── Hamburger (mobile) ─────────────────── */}
        <button
          type="button"
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen((p) => !p)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile Dropdown Menu ─────────────────── */}
      {mobileMenuOpen && (
        <div className="nav-mobile-menu" role="dialog" aria-label="Navigation menu">
          {/* Search */}
          <div className="input-group w-full">
            <button type="button" aria-label="Search">
              <Search size={18} />
            </button>
            <input
              className="input w-full"
              type="text"
              placeholder="Search Tasks"
              value={filters.search}
              onChange={(e) => setFilter({ search: e.target.value })}
              aria-label="Search tasks"
            />
            {filters.search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setFilter({ search: '' })}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="nav-mobile-menu__actions">
            {/* Filter */}
            <div className="filter-btn-wrapper" style={{ position: 'relative' }}>
              <button
                className={`btn-transparent btn-transparent__btn-group${isFilterPanelOpen || hasActiveFilters ? ' filter-active' : ''}`}
                type="button"
                onClick={toggleFilterPanel}
                aria-expanded={isFilterPanelOpen}
                aria-label="Toggle filter panel"
              >
                <Funnel size={18} />
                <span>Filter</span>
                {hasActiveFilters && <span className="filter-badge" />}
              </button>
              <FilterPanel />
            </div>

            {hasActiveFilters && (
              <button
                className="btn-transparent btn-transparent__btn-group filter-clear-btn"
                type="button"
                onClick={resetFilters}
                title="Clear all filters"
              >
                <span>Clear filters</span>
              </button>
            )}

            <button className="btn-transparent btn-transparent__btn-group" type="button">
              <RefreshCcwDot size={18} />
              <span>Export / Import</span>
            </button>

            <button className="btn btn--gray btn--gray__btn-group" type="button">
              <UserRoundPlus size={18} />
              <span>Invite</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;
