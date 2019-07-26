class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  before_action :set_users, only: [:new, :edit]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @group = Group.new(group_params)
    respond_to do |format|
      if @group.save
        format.html {redirect_to root_path, nitoce: 'グループを作成しました'}
        format.json
      else
        format.html {render :new}
        format.json
      end
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, {:user_ids => []})
  end

  def set_group
    @group = Group.find(params[:id])
  end

  def set_users
    @users = User.all
  end

end
