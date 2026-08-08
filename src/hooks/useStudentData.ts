import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Enrollment, CourseMaterial, Schedule, Grade, StudentDocument } from '../lib/types';

export function useStudentData() {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Fetch active enrollment with formation details
      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('*, formation:formations(*)')
        .eq('student_id', user.id)
        .in('status', ['active', 'pending'])
        .order('enrolled_at', { ascending: false })
        .limit(1)
        .single();

      const currentEnrollment = enrollmentData as Enrollment | null;
      setEnrollment(currentEnrollment);

      if (currentEnrollment?.formation_id) {
        // Fetch course materials for current formation
        const { data: mats } = await supabase
          .from('course_materials')
          .select('*')
          .eq('formation_id', currentEnrollment.formation_id)
          .order('order_index', { ascending: true });
        setMaterials((mats as CourseMaterial[]) || []);

        // Fetch schedules for current formation
        const { data: sched } = await supabase
          .from('schedules')
          .select('*')
          .eq('formation_id', currentEnrollment.formation_id)
          .order('day_of_week', { ascending: true });
        setSchedules((sched as Schedule[]) || []);

        // Fetch grades
        const { data: gr } = await supabase
          .from('grades')
          .select('*')
          .eq('student_id', user.id)
          .eq('formation_id', currentEnrollment.formation_id)
          .order('graded_at', { ascending: false });
        setGrades((gr as Grade[]) || []);
      }

      // Fetch student documents
      const { data: docs } = await supabase
        .from('student_documents')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });
      setDocuments((docs as StudentDocument[]) || []);

      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [user]);

  return {
    enrollment,
    materials,
    schedules,
    grades,
    documents,
    loading,
    error,
    refetch: fetchAll,
  };
}
