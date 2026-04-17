const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const email = 'jiiimmy0604@gmail.com';
  console.log(`Checking DB for ${email}...`);

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (userError) {
    console.error('User fetch error:', userError);
  } else {
    console.log('User data:', user);
  }

  const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(user.id);
  if (authError) {
    console.error('Auth user fetch error:', authError);
  } else {
    console.log('Auth user email confirmed at:', authUser.user.email_confirmed_at);
  }
}

check();
