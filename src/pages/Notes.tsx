import { Layout } from "@/components/layout/Layout";
import { NotesPanel } from "@/components/notes/NotesPanel";

const Notes = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notes</h1>
          <p className="text-slate-600">
            Communication hub for your healthcare team
          </p>
        </div>
        <NotesPanel />
      </div>
    </Layout>
  );
};

export default Notes;
