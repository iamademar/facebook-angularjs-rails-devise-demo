class Authorization
  include Mongoid::Document
  include Mongoid::Timestamps

  field :provider
  field :uid
   
  belongs_to :user
end