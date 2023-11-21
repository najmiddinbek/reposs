import { connectMongoDB } from "../../../lib/mongodb";
import Teacher from "../../../models/teachers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newteacherFIO: teacherFIO, newteacherPassword: teacherPassword, newteacherClass: teacherClass } = await request.json();
    await connectMongoDB();
    await Teacher.findByIdAndUpdate(id, { teacherClass, teacherFIO, teacherPassword });
    console.log('Updated topic:', updatedTopic);

    return NextResponse.json({ message: "Maktab Yangilandi" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const oqituvchi = await Teacher.findOne({ _id: id });
    return NextResponse.json({ oqituvchi }, { status: 200 });
}
