"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ReactNode, useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AdminCourseEditType } from "@/app/data/admin/admin-getper-course";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { reorderChapter, reorderLessons } from "../actions";
import { NewChapterModel } from "./NewChapterMode";
import { NewLessonModel } from "./NewLessonModel";
import { DeleteLesson } from "./DeleteLesson";
import { DeleteChapter } from "./DeleteChapter";

interface iAppProps {
  data: AdminCourseEditType;
}

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string;
  };
}

export function CourseStucture({ data }: iAppProps) {
  const initialItems =
    data.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        order: lesson.position,
        title: lesson.title,
      })),
    })) || [];

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems((prevItem) => {
      const updatedItems =
        data.chapter.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          order: chapter.position,
          isOpen:
            prevItem.find((item) => item.id === chapter.id)?.isOpen ?? true,
          lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            order: lesson.position,
            title: lesson.title,
          })),
        })) || [];
      return updatedItems;
    });
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function toggleChapter(chapterId: string) {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter,
      ),
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as
      | "chapter"
      | "lesson"
      | undefined;
    const overType = over.data.current?.type as "chapter" | "lesson";
    const courseId = data.id;

    if (activeType === "chapter") {
      let targetChapterId = null;
      if (overType === "chapter") {
        targetChapterId = overId;
      } else if (overType === "lesson") {
        targetChapterId = over.data.current?.chapterId ?? null;
      }
      if (!targetChapterId) {
        toast.add({
          type: "error",
          title: "Could not determine the chapter for reordering",
        });
      }

      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === targetChapterId);

      if (oldIndex === -1 || newIndex === -1) {
        toast.add({
          type: "error",
          title: "Could not find chapter old / new index for reording",
        });
        return;
      }
      const reorderLocalChapter = arrayMove(items, oldIndex, newIndex);

      const updatedChapterForState = reorderLocalChapter.map(
        (chapter, index) => ({
          ...chapter,
          order: index + 1,
        }),
      );
      const previousItems = [...items];
      setItems(updatedChapterForState);
      if (courseId) {
        const chaptersToUpdate = updatedChapterForState.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));
        const reorderPromise = () => reorderChapter(courseId, chaptersToUpdate);
        toast.promise(reorderPromise(), {
          loading: "Reordering Chapter",
          success: (result) => {
            if (result.status === "success") {
              return result.message;
            }
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to Reorded Chapter";
          },
        });
      }
    }
    if (activeType === "lesson" && overType === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = active.data.current?.chapterId;
      if (!chapterId || chapterId !== overChapterId) {
        toast.add({
          type: "error",
          title:
            "Lesson move between different chapter or invalid chapter ID is not allowed",
        });
        return;
      }

      const chpaterIndex = items.findIndex(
        (chapter) => chapter.id === chapterId,
      );
      if (chpaterIndex === -1) {
        toast.add({
          type: "error",
          title: "Could not find chapter id for lesson",
        });
        return;
      }
      const chapterToUpdate = items[chpaterIndex];
      const oldLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === activeId,
      );
      const newLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === overId,
      );

      if (oldLessonIndex === -1 || newLessonIndex === -1) {
        toast.add({
          type: "error",
          title: "Could not find Lesson",
        });
        return;
      }

      const reordedLessons = arrayMove(
        chapterToUpdate.lessons,
        oldLessonIndex,
        newLessonIndex,
      );

      const updateLessonForState = reordedLessons.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));
      const newItems = [...items];
      newItems[chpaterIndex] = {
        ...chapterToUpdate,
        lessons: updateLessonForState,
      };
      const previousItems = [...items];
      setItems(newItems);
      if (courseId) {
        const lessonToUpdate = updateLessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));
        const reorderdLessonPromise = () =>
          reorderLessons(chapterId, lessonToUpdate, courseId);
        toast.promise(reorderdLessonPromise(), {
          loading: "Reordering Lesson",
          success: (result) => {
            if (result.status === "success") {
              return result.message;
            }
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to Reorded Lesson";
          },
        });
      }
      return;
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-border">
          <CardTitle>Chapter-1</CardTitle>
          <NewChapterModel courseId={data.id} />
        </CardHeader>
        <CardContent className=" space-y-6">
          <SortableContext strategy={verticalListSortingStrategy} items={items}>
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                data={{ type: "chapter" }}
              >
                {(listeners) => (
                  <Card>
                    <Collapsible
                      open={item.isOpen}
                      onOpenChange={() => toggleChapter(item.id)}
                    >
                      <div className="flex items-center justify-between p-3 border-b border-border">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-grab opacity-60 hover:opacity-100"
                            {...listeners}
                          >
                            <GripVertical className="size-5" />
                          </Button>
                          <CollapsibleTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="flex items-center gap-4"
                                {...listeners}
                              >
                                {item.isOpen ? (
                                  <>
                                    <ChevronDown className="size-5" />
                                  </>
                                ) : (
                                  <>
                                    <ChevronRight className="size-5" />
                                  </>
                                )}
                              </Button>
                            }
                          />
                          <p className=" cursor-pointer hover:text-primary pl-2">
                            {item.title}
                          </p>
                        </div>
                        <DeleteChapter courseId={data.id} chapterId={item.id}/>
                      </div>
                      <CollapsibleContent>
                        <div className="p-2 space-y-2">
                          <SortableContext
                            items={item.lessons.map((lesson) => lesson.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {item.lessons.map((lesson) => (
                              <SortableItem
                                key={lesson.id}
                                id={lesson.id}
                                data={{ type: "lesson", chapterId: item.id }}
                              >
                                {(lessonListeners) => (
                                  <div className="flex item-center justify-between p-2 hover:bg-accent rounded-sm border">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        {...lessonListeners}
                                      >
                                        <GripVertical className="size-4" />
                                      </Button>
                                      <FileText className="size-4" />
                                      <Link
                                        href={`/admin/course/${data.id}/${item.id}/${lesson.id}`}
                                      >
                                        {lesson.title}
                                      </Link>
                                    </div>
                                    <DeleteLesson courseId={data.id} chapterId={item.id} lessonId={lesson.id}/>
                                  </div>
                                )}
                              </SortableItem>
                            ))}
                          </SortableContext>
                          <div className="p-2">
                            <NewLessonModel
                              courseId={data.id}
                              chapterId={item.id}
                            />
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )}
              </SortableItem>
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  );
}

function SortableItem({ children, id, className, data }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, data: data });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("touch-none", className, isDragging ? "z-10" : "")}
    >
      {children(listeners)}
    </div>
  );
}
