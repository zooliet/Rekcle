class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_no, :login_id
end
