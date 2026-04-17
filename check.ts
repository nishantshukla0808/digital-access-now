import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function run() {
  const email = 'jiiimmy0604@gmail.com'
  console.log(`Checking ${email}...`)
  
  const { data: user } = await supabase.from('users').select('*').eq('email', email).single()
  console.log('User data:', user)
}
run()
