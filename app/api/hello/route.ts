import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: "这是动态接口！",
    serverTime: new Date().toLocaleString()
  })
}