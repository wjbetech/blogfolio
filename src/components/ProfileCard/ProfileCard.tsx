import { Card } from "../ui/card";

export default function ProfileCard() {
  return (
    <Card className="text-center">
      <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
        <div className="w-full h-full rounded-full bg-linear-to-br from-slate-200 to-slate-400/40 animate-pulse filter blur-sm" />
      </div>
      <h3 className="font-bold text-xl">William East</h3>
      <p className="font-semibold">Fullstack Developer</p>
      <p className="font-semibold">KR-EN Translator</p>
      <p className="font-semibold">Professor at Seoul University of Foreign Studies</p>
      <div>Seoul · wjbeast@gmail.com</div>
    </Card>
  );
}
