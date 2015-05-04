if @user != nil
  json.success true
  json.email @user.email
  json.first_name @user.first_name
  json.last_name @user.last_name
  json.id @user.id.to_s
else
  json.success false
end