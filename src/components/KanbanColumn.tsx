import { useState, useRef } from 'react';
import { Plus, EllipsisVertical, Minimize2, Pencil, Trash2, Check, X } from 'lucide-react';
import { useBoardStore } from '../store/useBoardStore';
import { KanbanCard } from './KanbanCard';
import { applyFilters } from '../utils/filter';

interface KanbanColumnProps {
	columnId: string;
}

function KanbanColumn({ columnId }: KanbanColumnProps) {
	const { columns, tasks, filters, openCreateModal, deleteColumn, renameColumn, moveTask } =
		useBoardStore();

	const column = columns.find((c) => c.id === columnId);
	const [isDragOver, setIsDragOver] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [isRenaming, setIsRenaming] = useState(false);
	const [renameValue, setRenameValue] = useState(column?.title ?? '');
	const [dropIndex, setDropIndex] = useState<number>(-1);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const renameRef = useRef<HTMLInputElement>(null);

	if (!column) return null;

	// Get sorted, filtered tasks for this column
	const colTasks = tasks
		.filter((t) => t.columnId === columnId)
		.sort((a, b) => a.order - b.order);

	const filteredTasks = applyFilters(colTasks, filters);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		setIsDragOver(true);

		// Calculate drop index based on mouse position
		if (wrapperRef.current) {
			const cards = wrapperRef.current.querySelectorAll<HTMLElement>('.kanban-card-row');
			let idx = filteredTasks.length;
			for (let i = 0; i < cards.length; i++) {
				const rect = cards[i].getBoundingClientRect();
				const midY = rect.top + rect.height / 2;
				if (e.clientY < midY) {
					idx = i;
					break;
				}
			}
			setDropIndex(idx);
		}
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		// Only clear if leaving the wrapper itself (not entering a child)
		if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
			setIsDragOver(false);
			setDropIndex(-1);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const taskId = e.dataTransfer.getData('taskId');
		if (taskId) {
			const idx = dropIndex >= 0 ? dropIndex : colTasks.length;
			moveTask(taskId, columnId, idx);
		}
		setIsDragOver(false);
		setDropIndex(-1);
	};

	const commitRename = () => {
		const trimmed = renameValue.trim();
		if (trimmed && trimmed !== column.title) {
			renameColumn(columnId, trimmed);
		} else {
			setRenameValue(column.title);
		}
		setIsRenaming(false);
	};

	return (
		<section className="kanban-column">
			{/* Header */}
			<header className="kanban-header">
				<div className="kanban-header__left">
					<div>
						<div>
							{isRenaming ? (
								<div className="rename-wrapper self-center">
									<input
										ref={renameRef}
										className="rename-input"
										value={renameValue}
										autoFocus
										onChange={(e) => setRenameValue(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === 'Enter') commitRename();
											if (e.key === 'Escape') {
												setRenameValue(column.title);
												setIsRenaming(false);
											}
										}}
										onBlur={commitRename}
									/>
									<button type="button" className="rename-confirm" onMouseDown={commitRename}>
										<Check size={14} />
									</button>
									<button
										type="button"
										className="rename-cancel"
										onMouseDown={() => {
											setRenameValue(column.title);
											setIsRenaming(false);
										}}
									>
										<X size={14} />
									</button>
								</div>
							) : (
								<h4 className="self-center">{column.title}</h4>
							)}
							<button
								className="btn btn--light-blue self-center"
								type="button"
								onClick={() => openCreateModal(columnId)}
								aria-label={`Add task to ${column.title}`}
								title="Add task"
							>
								<Plus size={24} />
							</button>
							<div className="column-menu-wrapper self-center" ref={menuRef}>
								<button
									className="self-center column-menu-btn"
									type="button"
									onClick={() => setShowMenu((p) => !p)}
									aria-label="Column menu"
								>
									<EllipsisVertical size={18} />
								</button>
								{showMenu && (
									<div className="column-menu">
										<button
											type="button"
											onClick={() => {
												setIsRenaming(true);
												setShowMenu(false);
											}}
										>
											<Pencil size={14} />
											<span>Rename</span>
										</button>
										<button
											type="button"
											className="danger"
											onClick={() => {
												if (window.confirm(`Delete column "${column.title}" and all its tasks?`)) {
													deleteColumn(columnId);
												}
												setShowMenu(false);
											}}
										>
											<Trash2 size={14} />
											<span>Delete column</span>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="kanban-header__right">
					<div className="self-center">
						<button
							type="button"
							onClick={() => setIsCollapsed((p) => !p)}
							aria-label={isCollapsed ? 'Expand column' : 'Collapse column'}
							title={isCollapsed ? 'Expand' : 'Collapse'}
						>
							<Minimize2 size={15} />
						</button>
					</div>
				</div>
			</header>

			{/* Card List */}
			{!isCollapsed && (
				<div
					ref={wrapperRef}
					className={`kanban-card-wrapper${isDragOver ? ' drag-over' : ''}`}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					{filteredTasks.length === 0 && (
						<div className="empty-column-hint">
							{colTasks.length === 0
								? 'No tasks yet. Click + to add one.'
								: 'No tasks match current filters.'}
						</div>
					)}
					{filteredTasks.map((task, i) => (
						<div key={task.id} className="kanban-card">
							{isDragOver && dropIndex === i && <div className="drop-indicator" />}
							<KanbanCard task={task} />
						</div>
					))}
					{isDragOver && dropIndex === filteredTasks.length && (
						<div className="drop-indicator" />
					)}
				</div>
			)}

		</section>
	);
}

export { KanbanColumn };
